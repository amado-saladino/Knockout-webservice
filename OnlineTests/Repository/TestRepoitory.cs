using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OnlineTests.Models;
using System.Data.Entity;


namespace OnlineTests.Repository
{
    public class TestRepoitory:IRepository<Table>
    {
        private TestsEntities _db;

        public TestRepoitory()
        {
            _db = new TestsEntities();
        }

        public IEnumerable<Table> List
        {
            get
            {
                return _db.Tables;
            }
        }

        public void Add(Table entity)
        {
            _db.Tables.Add(entity);
            _db.SaveChanges();
        }

        public void Delete(Table entity)
        {
            _db.Tables.Remove( entity );
            _db.SaveChanges();
        }

        public void Update(Table entity)
        {
            _db.Entry(entity).State = EntityState.Modified;
            _db.SaveChanges();
        }

        public Table FindById(string Id)
        {
            return _db.Tables.Find(Id);
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}